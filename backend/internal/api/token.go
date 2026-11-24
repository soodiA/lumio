package api

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/soodia/lumio/backend/internal/httpx"
)

const tokenTTL = 90 * 24 * time.Hour

type claims struct {
	UID string `json:"uid"`
	Exp int64  `json:"exp"`
}

var b64 = base64.RawURLEncoding

func (s *Server) mac(p string) []byte {
	m := hmac.New(sha256.New, []byte(s.Cfg.TokenSecret))
	m.Write([]byte(p))
	return m.Sum(nil)
}

func (s *Server) signToken(uid string) string {
	payload, _ := json.Marshal(claims{UID: uid, Exp: time.Now().Add(tokenTTL).Unix()})
	p := b64.EncodeToString(payload)
	return p + "." + b64.EncodeToString(s.mac(p))
}

func (s *Server) parseToken(tok string) (string, error) {
	p, sig, ok := strings.Cut(tok, ".")
	if !ok {
		return "", errors.New("malformed")
	}
	want, err := b64.DecodeString(sig)
	if err != nil || !hmac.Equal(want, s.mac(p)) {
		return "", errors.New("bad signature")
	}
	raw, err := b64.DecodeString(p)
	if err != nil {
		return "", errors.New("bad payload")
	}
	var c claims
	if json.Unmarshal(raw, &c) != nil || c.UID == "" || time.Now().Unix() > c.Exp {
		return "", errors.New("bad or expired claims")
	}
	return c.UID, nil
}

func (s *Server) authed(next func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tok, ok := strings.CutPrefix(r.Header.Get("Authorization"), "Bearer ")
		if !ok {
			httpx.Error(w, http.StatusUnauthorized, "UNAUTHORIZED", "login required")
			return
		}
		uid, err := s.parseToken(tok)
		if err != nil {
			httpx.Error(w, http.StatusUnauthorized, "UNAUTHORIZED", "login required")
			return
		}
		next(w, r, uid)
	}
}
