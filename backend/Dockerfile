FROM golang:1.26-alpine AS build
WORKDIR /src
ARG GOPROXY=https://go.cloudinative.com
ARG GOSUMDB=off
ENV GOPROXY=${GOPROXY} GOSUMDB=${GOSUMDB}
COPY go.mod go.sum* ./
RUN go mod download || true
COPY . .
RUN go mod tidy && CGO_ENABLED=0 go build -ldflags "-s -w" -o /out/lumio-api ./cmd/server && CGO_ENABLED=0 go build -ldflags "-s -w" -o /out/lumio-seed ./cmd/seed

FROM alpine:3.20
RUN adduser -D -u 10001 lumio
USER lumio
COPY --from=build /out/lumio-api /out/lumio-seed /usr/local/bin/
ENTRYPOINT ["lumio-api"]
