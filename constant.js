module.exports = {
	SERVER_PORT : 3000,
	HOST_NAME : "http://webpe.herokuapp.com",
	SALT_WORK_FACTOR : 10,
	IMAGE_MAX_UPLOAD : 1000000,
	IMAGE_TYPES : ['jpeg', 'png','jpg'],
	JWT_USER_STRING : "UserSecret",
	JWT_ADMIN_STRING : "AdminSecret",
	// Username must start with Uppercase & Lowercase letter , Cannot contains symbols, Min 6 characters & Max 25 characters
	REGEX_USERNAME : /^([A-Z]|[a-z])(\w){5,24}$/, 
	// Password should contains at least 1 digit, Min 8 characters & Max 40 characters
	REGEX_PASSWORD : /^(?=.*\d)[0-9a-zA-Z]{8,40}$/

}