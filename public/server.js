import cors from "cors";


const allowedOrigins = [
  "http://127.0.0.1:5500",    // dev local
  "https://adopets-nefs94biz-mariahs-projects-e924f2e3.vercel.app/"  // front em produção
];

app.use(cors({
  origin: function(origin, callback) {
    // permitir requests sem origin (Postman, por exemplo) ou os que estiverem na lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS não permitido para origem " + origin));
    }
  },
  credentials: true
}));