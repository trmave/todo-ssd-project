import app from './infrastructure/server/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 SSOT Engram Enforcement Activo 🔥`);
  console.log(`[CORS Allowed]: https://purple-dune-0afb89c1e.2.azurestaticapps.net`);
  console.log(`[Route Registered]: GET /`);
  console.log(`[Route Registered]: GET /api/todos`);
  console.log(`[Route Registered]: POST /api/todos`);
  console.log(`[Route Registered]: PATCH /api/todos/:id`);
  console.log(`[Route Registered]: DELETE /api/todos/:id`);
  console.log(`Servidor de To-Dos corriendo en puerto ${PORT}`);
});
