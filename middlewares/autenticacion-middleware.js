import UsuariosService from "./../src/services/UsauriosService.js";

class AutenticationMiddleWare {
    requiereAutenticacion = async function (req,res,next) {
        let token;
        let usuario;
        let currentDate = new Date ();
        let TokenExpirationDate = null;
        

        if (req.path.toLowerCase().startsWith("/front/")) return next();
        if (req.path.toLowerCase().startsWith("/api/usuarios/login")) return next();
        if (req.path.toLowerCase().startsWith("/api/usuarios/ingredientesxpizzas")) return next();
        if (req.path.toLowerCase().startsWith("/api/ingredientes")) return next();
        if (req.path.toLowerCase().startsWith("/api/unidades")) return next();

        //OBTENGO EL TOKEN DEL HEADER

        token = req.get('token');
        
        if((token==null) || (token=='undefined')){
            res.status(401).send('401 Unauthorized, el token ingresado NO es valido.');
        }else{
            let svc = new UsuariosService();
            usuario = await svc.getByToken(token);
            if (usuario != null){
                console.log('Usuario', usuario);
                TokenExpirationDate = new Date(usuario.TokenExpirationDate);

                //verifico que no haya expirado la fecha
                
                console.log(currentDate);
                console.log(TokenExpirationDate);
                if (currentDate < TokenExpirationDate){
                    console.log("OK");
                    next(); 

                } else {
                    console.log("EXPIROOO");
                    res.status(401).send('401 Unauthorized, el token expiró.');
                }

            } else{

                res.status(401).send('401 Unauthorized, token/ usuario inexistente.');
            }
        }
    }
}

export default new AutenticationMiddleWare;