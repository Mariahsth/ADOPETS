import jwt from 'jsonwebtoken';

class Autenticacao {
 

    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (email === 'admin@adopets.com' && senha === 'adopets1234') {
                const token = jwt.sign({ email, role: 'admin' }, process.env.SECRET || 'chave_secreta_padrao', { expiresIn: '1h' });
                return res.json({ token });
            }
            return res.status(401).json({ message: "Credenciais inválidas" });
        } catch (error) {
            return res.status(500).json({ message: "Erro no servidor", error: error.message });
        }
    }
    static async admin(req, res) {
        res.json({ dados: 'somente admin vê isso' });
    }

  
}

export default Autenticacao;
