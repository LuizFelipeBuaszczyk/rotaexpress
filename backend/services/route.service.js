const routeRepository = require("../repositories/route.repository");
const firmRepository = require("../repositories/firm.repository");
const { Client } = require("@googlemaps/google-maps-services-js");
const deliveryRepository = require("../repositories/delivery.repository");
const googleMapsClient = new Client({});
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function generateOptimizedRoute({
  deliveryIds,
  originAddress,
  routeName,
  id_user,
  fk_id_firm,
}) {
  // Buscar endereços delivery
  const deliveries = await deliveryRepository.findDeliveriesByIds(deliveryIds);
  if (deliveries.length === 0) {
    throw new Error(
      "Nenhuma entrega válida ou disponível encontrada para otimização."
    );
  }
  const waypoints = deliveries.map((d) => d.address);

  // Chama api do google
  const directionsResponse = await googleMapsClient.directions({
    params: {
      origin: originAddress,
      destination: originAddress,
      waypoints: waypoints,
      optimizeWaypoints: true,
      key: API_KEY,
    },
  });
  if (directionsResponse.data.status !== "OK") {
    throw new Error(`Erro na API do Google: ${directionsResponse.data.status}`);
  }
  const rotaCalculada = directionsResponse.data.routes[0];

  const dadosRotaMae = {
    name: routeName,
    origin: originAddress,
    fk_id_firm: fk_id_firm,
    polyline: rotaCalculada.overview_polyline.points,
    distancia_metros: rotaCalculada.legs.reduce(
      (t, l) => t + l.distance.value,
      0
    ),
    duracao_segundos: rotaCalculada.legs.reduce(
      (t, l) => t + l.duration.value,
      0
    ),
    waypoint_order: JSON.stringify(rotaCalculada.waypoint_order),
  };
  console.log(dadosRotaMae);
  const Rota = await routeRepository.findRouteByName(
    dadosRotaMae.name,
    id_user
  );
  console.log(Rota.id_route);
  const novaRota = await routeRepository.updateRoutes(
    dadosRotaMae,
    Rota.id_route,
    id_user
  );
  console.log(novaRota);

  return routeRepository.findRouteById(novaRota.id_route, id_user);
}

async function getRouteByName(name, id_user) {
  const rota = await routeRepository.findRouteByName(name, id_user);
  if (!rota) {
    const error = new Error("Rota não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return rota;
}

async function createRoute(routeData, id_user) {
  const firm = await firmRepository.findNameById(id_user, routeData.firm_name);

  if (!firm) {
    const error = new Error("Firma não encontrada");
    error.statusCode = 404;
    throw error;
  }

  routeData.fk_id_firm = firm.id_firm;

  return await routeRepository.create(routeData);
}

async function getRouteByFirm(firm_name, id_user) {
  const firm = await firmRepository.findNameById(id_user, firm_name);

  if (!firm) {
    const error = new Error("Firma não encontrada");
    error.statusCode = 404;
    throw error;
  }

  return await routeRepository.findRouteByFirm(firm_name, id_user);
}

async function getRoutes(id_user) {
  return await routeRepository.findRoutes(id_user);
}

async function updateRoutes(newData, routeId, id_user) {
  const updatedRoute = await routeRepository.updateRoutes(
    newData,
    routeId,
    id_user
  );

  if (updatedRoute) return updatedRoute;
  const error = new Error("Rota não encontrada");
  error.statusCode = 404;
  throw error;
}

async function deleteRoutes(routeId, id_user) {
  const route = await routeRepository.deleteRoutes(routeId, id_user);
  if (route) return true;
  const error = new Error("Rota não encontrada");
  error.statusCode = 404;
  throw error;
}

module.exports = {
  createRoute,
  getRouteByFirm,
  getRoutes,
  updateRoutes,
  deleteRoutes,
  generateOptimizedRoute,
  getRouteByName,
};
