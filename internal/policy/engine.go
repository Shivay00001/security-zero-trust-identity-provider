package policy

import "github.com/Shivay00001/security-zero-trust-identity-provider/internal/core"

type RequestContext struct {
	IP        string
	DeviceID  string
	User      *core.User
	Resource  string
	Action    string
	Timestamp int64
}

type PolicyEngine interface {
	Evaluate(ctx RequestContext) (bool, error)
}

type SimplePolicyEngine struct{}

func (e *SimplePolicyEngine) Evaluate(ctx RequestContext) (bool, error) {
	// Simple rule: MFA required for admin actions
	if ctx.Action == "admin" && !ctx.User.MFAEnabled {
		return false, nil
	}
	return true, nil
}
