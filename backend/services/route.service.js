const routeRepository = require("../repositories/route.repository");
const firmRepository = require("../repositories/firm.repository");
const { Client } = require("@googlemaps/google-maps-services-js");
const deliveryRepository = require("../repositories/delivery.repository");
const googleMapsClient = new Client({});
const API_KEY = "";

async function generateOptimizedRoute({
  deliveryIds,
  originAddress,
  routeName,
  id_user,
  id_delivery_guy = null,
}) {
  const deliveries = await deliveryRepository.findDeliveriesByIds(
    deliveryIds,
    id_user
  );
  if (deliveries.length === 0) {
    const error = new Error("Nenhuma entrega válida ou disponível encontrada.");
    error.statusCode = 404;
    throw error;
  }
  if (deliveries.length < deliveryIds.length) {
    const error = new Error("Uma ou mais entregas não foram encontradas.");
    error.statusCode = 404;
    throw error;
  }
  const waypoints = deliveries.map((d) => d.address);

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
    const error = new Error(
      `Erro na API do Google: ${directionsResponse.data.status}`
    );
    error.statusCode = 404;
    throw error;
  }
  const rotaCalculada = directionsResponse.data.routes[0];

  const dadosRotaMae = {
    name: routeName,
    origin: originAddress,
    id_delivery_guy: id_delivery_guy,
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
  const Rota = await routeRepository.findRouteByName(
    dadosRotaMae.name,
    id_user
  );
  if (!Rota) {
    const error = new Error("Rota não encontrada");
    error.statusCode = 404;
    throw error;
  }
  const novaRota = await routeRepository.updateRoutes(
    dadosRotaMae,
    Rota.id_route,
    id_user
  );

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

  const existingRoute = await routeRepository.findRouteByName(
    routeData.name,
    id_user
  );

  if (existingRoute) {
    const error = new Error("Rota com este nome já existe");
    error.statusCode = 400;
    throw error;
  }

  routeData.fk_id_firm = firm.id_firm;

  return await routeRepository.create(routeData);
}

async function getRouteById(id_route, id_user) {
  const route = await routeRepository.findRouteById(id_route, id_user);
  if (!route) {
    const error = new Error("Rota não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return route;
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
  const routes = await routeRepository.findRoutes(id_user);
  if (routes.length === 0) {
    const error = new Error("Nenhuma rota encontrada");
    error.statusCode = 404;
    throw error;
  }
  return routes;
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
  getRouteById,
};
