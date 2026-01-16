import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPopup from '../Main/components/LoginPopup/LoginPopup'
import TeamPage from "../TeamPage/TeamPage"
import AvatarPopup from "../Forms/Avatar/Avatar"
import Popup from "../Popup/Popup";
import ProfilePopup from "../Main/components/ProfilePopup/ProfilePopup";
import { getPokemonPage, getPokemonByType } from "../../utils/PokeApi"
import { getPokemonByNameOrId } from "../../utils/PokeApi";
import FullscreenLoader from "../Preloader/FullScreenLoader";
import { POKE_PAGE_SIZE, LS_TEAM_KEY, LS_AVATAR_KEY, LS_TRAINER_KEY } from "../../utils/config";


function App() {

  const [cards, setCards] = useState([]);

const [isLoading, setIsLoading] = useState(true);

const [error, setError] = useState("");

const [offset, setOffset] = useState(0);

const [popup, setPopup] = useState(null)

const [email, setEmail] = useState(null)

const [team, setTeam] = useState(() => {
  try {
    const saved = localStorage.getItem(LS_TEAM_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

const [activeType, setActiveType] = useState("");

const [typeTotal, setTypeTotal] = useState(0);

  const handleOpenPopup = (popupData) => setPopup(popupData)
  const handleClosePopup = () => setPopup(null)

  const [avatarUrl, setAvatarUrl] = useState(() => {
  try {
    return localStorage.getItem(LS_AVATAR_KEY) || "";
  } catch {
    return "";
  }
});

  const canShowMore =
  activeType ? offset < typeTotal : true;

  function closeAllPopups() {
  handleClosePopup()
}

const [trainer, setTrainer] = useState(() => {
  try {
    const saved = localStorage.getItem(LS_TRAINER_KEY);
    return saved
      ? JSON.parse(saved)
      : { name: "Tu equipo", about: "Arma tu team Pokemón" };
  } catch {
    return { name: "Tu equipo", about: "Arma tu team Pokemón" };
  }
});


  function handleLoginClick() {
  handleOpenPopup({
    title: "Iniciar sesión",
    children: (
      <LoginPopup
        onLogin={(data) => {
          console.log("login submit:", data)
          closeAllPopups()
        }}
      />
    ),
  })
}

 function handleSignOut() {
    setEmail(null)
  }


  function handleUpdateAvatar({ avatar }) {
    console.log("avatar submit:", avatar)
    setAvatarUrl(avatar)
    closeAllPopups()
  }

   // abre popup avatar (en TeamPage)
  function handleOpenAvatarPopup() {
    handleOpenPopup({
      title: "Cambiar avatar",
      children: <AvatarPopup onUpdateAvatar={handleUpdateAvatar} />,
    })
  }

function handleUpdateUser({ name, about }) {
  setTrainer({ name, about });
  closeAllPopups();
}

function handleOpenProfilePopup() {
  handleOpenPopup({
    title: "Editar perfil",
    children: 
    <ProfilePopup 
    onUpdateUser={handleUpdateUser}
    />,
  });
}

function addToTeam(card) {
  setTeam((prev) => {
    // evita duplicados por _id
    if (prev.some((p) => p._id === card._id)) return prev;

    // encontrar primer slot vacío (1..6)
    const usedSlots = new Set(prev.map((p) => p.slot));
    const emptySlot = [1, 2, 3, 4, 5, 6].find((s) => !usedSlots.has(s));

    // si no hay slots disponibles, no agrega
    if (!emptySlot) return prev;

    return [...prev, { ...card, slot: emptySlot }];
  });
}

useEffect(() => {
  try {
    localStorage.setItem(LS_TEAM_KEY, JSON.stringify(team));
  } catch (e) {
    console.warn("No se pudo guardar team en localStorage", e);
  }
}, [team]);

useEffect(() => {
  try {
    localStorage.setItem(LS_AVATAR_KEY, avatarUrl || "");
  } catch (e) {
    console.warn("No se pudo guardar avatar en localStorage", e);
  }
}, [avatarUrl]);

useEffect(() => {
  try {
    localStorage.setItem(LS_TRAINER_KEY, JSON.stringify(trainer));
  } catch (e) {
    console.warn("No se pudo guardar trainer en localStorage", e);
  }
}, [trainer]);

  useEffect(() => {
  let isMounted = true;

  getPokemonPage({ limit: POKE_PAGE_SIZE, offset: 0 })
    .then((data) => {
      if (!isMounted) return;
      setCards(data);
      setOffset(POKE_PAGE_SIZE);
    })
    .catch((e) => {
      if (!isMounted) return;
      setError(e.message || "Error cargando Pokédex");
    })
    .finally(() => {
      if (!isMounted) return;
      setIsLoading(false);
    });

  return () => {
    isMounted = false;
  };
}, []);

    function handleShowMore() {
  setIsLoading(true);
  setError("");

  const loader = activeType
    ? getPokemonByType(activeType, { limit: POKE_PAGE_SIZE, offset })
        .then(({ cards: more }) => more)
    : getPokemonPage({ limit: POKE_PAGE_SIZE, offset });

  loader
    .then((more) => {
      setCards((prev) => [...prev, ...more]);
      setOffset((prev) => prev + POKE_PAGE_SIZE);
    })
    .catch((e) => setError(e.message || "Error cargando más Pokémon"))
    .finally(() => setIsLoading(false));
}


      function handleSearchPokemon(query) {
  setIsLoading(true);
  setError("");
  setCards([]);
  setOffset(0);

  getPokemonByNameOrId(query)
    .then((pokemon) => {
      setCards([pokemon]);
    })
    .catch(() => {
      setError("No se ha encontrado nada");
    })
    .finally(() => {
      setIsLoading(false);
    });
}

    function handleTypeSelect(typeId) {
  setActiveType(typeId);
  setCards([]);
  setOffset(0);
  setError("");
  setIsLoading(true);

  getPokemonByType(typeId, { limit: POKE_PAGE_SIZE, offset: 0 })
    .then(({ cards: firstPage, total }) => {
      setCards(firstPage);
      setTypeTotal(total);
      setOffset(POKE_PAGE_SIZE);
    })
    .catch((e) => {
      setError(e.message || "Error filtrando por tipo");
    })
    .finally(() => setIsLoading(false));
}

function removeFromTeam(card) {
  setTeam((prev) => prev.filter((p) => p.slot !== card.slot));
}


  return (
    <div className="page">
      {isLoading && <FullscreenLoader />}
      <Header
        email={email}
        onSignOut={handleSignOut}
        onLoginClick={handleLoginClick}
        onTypeSelect={handleTypeSelect}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              cards={cards}
              isLoading={isLoading}
              error={error}
              onShowMore={canShowMore ? handleShowMore : null}
              onOpenPopup={handleOpenPopup}
              onAddToTeam={addToTeam}
              onSearch={handleSearchPokemon} 
            />
          }
        />
        <Route
        path='/team'
        element={
          <TeamPage
            onOpenAvatarPopup={handleOpenAvatarPopup}
            avatarUrl={avatarUrl}
            onOpenProfilePopup={handleOpenProfilePopup}
            trainer={trainer}
            team={team}
            onOpenPopup={handleOpenPopup}
            onRemoveFromTeam={removeFromTeam}
          />
        }
        />
      </Routes>

      {popup && (
        <Popup onClose={closeAllPopups} title={popup.title} isOpen>
      {typeof popup.children === "function"
          ? popup.children({ onClose: closeAllPopups })
          : popup.children}
        </Popup>  
        )}

      <Footer />
    </div>
  )
}

export default App