package api

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/health", HealthHandler).Methods("GET")
	r.HandleFunc("/auth/token", TokenHandler).Methods("POST")
	r.HandleFunc("/auth/authorize", AuthorizeHandler).Methods("GET", "POST")
	r.HandleFunc("/.well-known/openid-configuration", OIDCConfigHandler).Methods("GET")
}

func HealthHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func TokenHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement OAuth2 Token Grant
	w.WriteHeader(http.StatusNotImplemented)
}

func AuthorizeHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement OAuth2 Authorization Request
	w.WriteHeader(http.StatusNotImplemented)
}

func OIDCConfigHandler(w http.ResponseWriter, r *http.Request) {
	config := map[string]interface{}{
		"issuer":                 "https://idp.example.com",
		"token_endpoint":         "https://idp.example.com/auth/token",
		"authorization_endpoint": "https://idp.example.com/auth/authorize",
		"jwks_uri":               "https://idp.example.com/.well-known/jwks.json",
	}
	json.NewEncoder(w).Encode(config)
}
