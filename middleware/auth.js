import jwt from "jsonwebtoken"
import {User} from "../models/user.js"
import serverConfig from '../config/serverConfig.js'
import { BadRequestError, UnauthorizedError } from "../errors/index.js"

const requireLoggedInUser = async (req, res, next) => {
	try {
		const {authorization} = req.headers
		if(!authorization) throw new BadRequestError('No token provided')

		let token
		if(authorization.startsWith('Bearer ')){
			[, token] = authorization.split(' ')
		} else {
			token = authorization
		}
		
		if (!token) throw new UnauthorizedError('No auth token provided')
		
	
		const decodedToken = jwt.verify(token,  serverConfig.jwtSecret)
		const user = await User.findById(decodedToken._id)
		if (!user) {
			throw new UnauthorizedError('Invalid auth token')
		}
	
		req.user = decodedToken
		return next()
	} catch (error) {
		next(error)
	}
}

export { requireLoggedInUser }