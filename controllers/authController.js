import * as authService from "../services/auth.js"
import serverConfig from '../config/serverConfig.js';



export async function create(req, res, next) {
    try {
      const { body: data } = req;
      const user = await authService.create(data);
  
      res.status(201).json({
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      serverConfig.DEBUG(`Error in user create controller: ${error}`);
      next(error);
    }
  }

export const login = async function (req, res, next) {
	try {
		const {body: data} = req

		const login = await authService.otherLogin(data)
		
		res.status(200).send({ 
			message: "Login successful", 
			data: login 
		})
	} catch (error) {
		next(error)
	}
}