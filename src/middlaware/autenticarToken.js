import jwt from 'jsonwebtoken';


export function autenticarToken(req, res, next) {
    console.log("cheguei no middleware")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token:",token)
    
    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado' });
      }

    jwt.verify(token, process.env.SECRET || 'chave_secreta_padrao', (err, usuario) => {
        console.log("Secret no middlaware:",process.env.SECRET)
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
            }
        req.usuario = usuario;
        next();
    });
  }