// Vercel Serverless Function: GET /api/economy/roles
export default function handler(req, res) {
  const roles = [
    { tag: "[act+10]", title: "Превосходный актив", salary: 450 },
    { tag: "[act+9]", title: "Крайне высокий актив", salary: 300 },
    { tag: "[act+8]", title: "Очень хороший актив", salary: 210 },
    { tag: "[act+7]", title: "Отличный актив", salary: 120 },
    { tag: "[act+6]", title: "Высокий актив", salary: 100 },
    { tag: "[act+5]", title: "Хороший актив", salary: 80 },
    { tag: "[act+4]", title: "Нормальный актив", salary: 50 },
    { tag: "[act+3]", title: "Не особый актив", salary: 30 },
  ];

  return res.status(200).json({ success: true, roles });
}
