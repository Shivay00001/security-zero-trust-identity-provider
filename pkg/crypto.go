package pkg

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
)

func GenerateRandomString(n int) (string, error) {
	b := make([]byte, n)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

func HashSecret(secret string) string {
	// In production, use bcrypt or similar
	return fmt.Sprintf("sha256:%s", secret) // Mock
}
