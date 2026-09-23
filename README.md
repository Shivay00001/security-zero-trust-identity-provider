# Zero Trust Identity Provider

[![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8.svg)](https://go.dev/)
[![OAuth2](https://img.shields.io/badge/OAuth2-2.0-blue.svg)](https://oauth.net/2/)
[![OIDC](https://img.shields.io/badge/OIDC-1.0-orange.svg)](https://openid.net/connect/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A **production-grade Identity Provider (IdP)** built in Go, implementing Zero Trust principles. Designed for granular access control, high security, and seamless OIDC integration.

## 🚀 Features

- **OAuth2/OIDC Compliant**: Implements core authorization and token grant flows.
- **Zero Trust Policy Engine**: Granular, context-aware policy evaluation.
- **JWT Authentication**: Secure, short-lived tokens with cryptographic signing.
- **MFA Ready**: Extensible MFA hooks for reinforced identity verification.
- **High Performance**: Optimized Go backend with concurrency support.
- **Containerized**: Native Docker support for modern cloud environments.

## 📁 Project Structure

```
security-zero-trust-identity-provider/
├── cmd/
│   └── idp-server/      # Server entry point
├── internal/
│   ├── api/             # HTTP/gRPC handlers
│   ├── core/            # Domain models and business logic
│   ├── policy/          # Zero Trust policy engine
│   └── storage/         # Persistent storage (SQL/NoSQL)
├── pkg/                 # Reusable packages (crypto, logging)
├── tests/               # Integration and unit tests
├── Dockerfile           # Production build
├── docker-compose.yml   # Multi-service local setup
└── go.mod               # Dependency management
```

## 🛠️ Quick Start

```bash
# Clone
git clone https://github.com/Shivay00001/security-zero-trust-identity-provider.git

# Install dependencies
go mod download

# Run the server
go run cmd/idp-server/main.go
```

## 📄 License

MIT License

## ▶️ Run

```bash
go build -o idp-server ./cmd/idp-server
PORT=8080 ./idp-server   # GET /health | POST /auth/token | /.well-known/openid-configuration
```

Docker: `docker build -t zero-trust-idp . && docker run -p 8080:8080 zero-trust-idp`
