import jwt from "jsonwebtoken";

const JWT_SECRET = "my_super_secret";
const BEARER_AUTH = "Bearer ";

export function hasValidToken(req, res, next) {
	const authHeader = req.get("Authorization");
	if (!authHeader || !authHeader.startsWith(BEARER_AUTH)) {
		return res.status(401).json({message: "Auth token header missing"});
	}

	try {
		const token = authHeader.substring(
			BEARER_AUTH.length,
			authHeader.length
		);
		const payload = jwt.verify(token, JWT_SECRET);
		req.jwt = { token, payload };
		next();
	} catch (error) {
		return res.status(403).json({message: "Invalid token"});
	}
};

export function signin(email) {
	return jwt.sign({email}, JWT_SECRET, {expiresIn: '15m'});
}
