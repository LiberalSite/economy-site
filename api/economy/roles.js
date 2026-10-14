// Vercel Serverless Function: GET /api/economy/roles
export default function handler(req, res) {
  const roles = [
    { tag: "@[act+10]", title: "Превосходный Актив", salary: 1000 },
    { tag: "@[act+9]", title: "Крайне Высокий Актив", salary: 800 },
    { tag: "@[act+8]", title: "Очень Хороший Актив", salary: 650 },
    { tag: "@[act+7]", title: "Отличный Актив", salary: 500 },
    { tag: "@[act+6]", title: "Высокий Актив", salary: 400 },
    { tag: "@[act+5]", title: "Хороший Актив", salary: 300 },
    { tag: "@[act+4]", title: "Нормальный Актив", salary: 200 },
    { tag: "@[act+3]", title: "Не особый Актив", salary: 120 },
    { tag: "@[act+2]", title: "Низкий Актив", salary: 70 },
    { tag: "@[act+1]", title: "Ужасный Актив", salary: 30 },
    { tag: "@[act-0]", title: "Мертв", salary: 0 },
  ];

  return res.status(200).json({ success: true, roles });
}
