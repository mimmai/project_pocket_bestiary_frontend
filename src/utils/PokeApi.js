import { POKE_API_BASE_URL } from "./config";

function checkResponse(res) {
  if (res.ok) return res.json();
  return res
    .json()
    .catch(() => ({}))
    .then((data) => {
      const message =
        data?.detail ||
        data?.message ||
        `Error HTTP ${res.status} ${res.statusText}`;
      return Promise.reject(new Error(message));
    });
}

function request(path) {
  return fetch(`${POKE_API_BASE_URL}${path}`).then(checkResponse);
}

/*Convierte el JSON de PokeAPI (/pokemon/:id) en el shape de Card
*/
export function mapPokemonToCard(p) {
  return {
    _id: String(p.id),
    name: p.name?.[0]?.toUpperCase() + p.name?.slice(1),
    link:  p.sprites?.other?.["official-artwork"]?.front_default ||
    p.sprites?.other?.home?.front_default ||
    p.sprites?.front_default ||
    "",
    types: (p.types || []).map((t) => ({ type: { name: t.type.name } })),
    height: p.height,
    weight: p.weight, 
    stats: p.stats || [],
    abilities: p.abilities || [],
    raw: p,
  };
}


 /* Trae detalles por nombre o id: /pokemon/{name}*/
export function getPokemonByNameOrId(nameOrId) {
  const q = String(nameOrId).trim().toLowerCase();
  return request(`/pokemon/${encodeURIComponent(q)}`).then(mapPokemonToCard);
}


 /* Trae una “página” de pokémon (listado) y luego baja detalles*/
export async function getPokemonPage({ limit = 3, offset = 0 } = {}) {
  const list = await request(`/pokemon?limit=${limit}&offset=${offset}`);
  const results = list?.results || [];

  // Baja detalles en paralelo
  const details = await Promise.all(
    results.map((r) => fetch(r.url).then(checkResponse))
  );

  return details.map(mapPokemonToCard);
}

    export async function getPokemonByType(typeId, { limit = 3, offset = 0 } = {}) {
  const type = String(typeId).trim().toLowerCase();
  const data = await request(`/type/${encodeURIComponent(type)}`);

  // PokeAPI devuelve: pokemon: [{ pokemon: { name, url }, slot }]
  const all = (data?.pokemon || []).map((x) => x.pokemon);

  // paginación local (porque /type no tiene limit/offset)
  const page = all.slice(offset, offset + limit);

  // bajar detalles de cada pokemon de esa page
  const details = await Promise.all(
    page.map((p) => request(`/pokemon/${encodeURIComponent(p.name)}`))
  );

  return {
    cards: details.map(mapPokemonToCard),
    total: all.length,
  };
}


// Evoluciones (máximo 3)

function pickFirstChainPath(chainNode) {
  const out = [];
  let node = chainNode;

  while (node && out.length < 3) {
    out.push(node.species?.name);
    // SOLO con la primera evolución 
    node = Array.isArray(node.evolves_to) && node.evolves_to.length > 0
      ? node.evolves_to[0]
      : null;
  }

  return out.filter(Boolean);
}

export async function getEvolutionChainLinear3(nameOrId) {
  const q = String(nameOrId).trim().toLowerCase();

  // 1) desde pokemon → species.url
  const pokemon = await request(`/pokemon/${encodeURIComponent(q)}`);
  const speciesUrl = pokemon?.species?.url;
  if (!speciesUrl) return [];

  // 2) species → evolution_chain.url
  const species = await fetch(speciesUrl).then(checkResponse);
  const evoUrl = species?.evolution_chain?.url;
  if (!evoUrl) return [];

  // 3) evolution chain
  const evoData = await fetch(evoUrl).then(checkResponse);
  const names = pickFirstChainPath(evoData?.chain);

  // 4) bajar detalles de esos 1..3 para stats/sprites
  const details = await Promise.all(
    names.map((n) => request(`/pokemon/${encodeURIComponent(n)}`))
  );

  // tu popup espera { id, name, sprite, atk, spa }
  return details.slice(0, 3).map((p) => ({
    id: p.id,
    name: p.name,
    sprite: p.sprites?.front_default || "",
    atk:
      p.stats?.find((s) => s.stat?.name === "attack")?.base_stat ?? "-",
    spa:
      p.stats?.find((s) => s.stat?.name === "special-attack")?.base_stat ?? "-",
  }));
}

