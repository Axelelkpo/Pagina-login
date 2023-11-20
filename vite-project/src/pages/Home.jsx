import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unsetUser } from "../App/userSlice";
import { useNavigate } from "react-router-dom";
import { ProductsList } from "../components/ProductsList";
import productsData from "./users.json"; // Importa el archivo JSON

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    // Simulando una solicitud HTTP (puedes eliminar esto en tu aplicación real)
    // Axios.get("http://localhost:3000/products")
    //   .then((response) => {
    //     setProducts(response.data);
    //   })
    //   .catch((error) => {
    //     setError("Error loading products: " + error.message);
    //   });

    // Usando los datos del archivo JSON directamente
    if (!productsData || !productsData.products) {
      setError("Error loading products: Data format is incorrect");
    } else {
      setProducts(productsData.products);
    }
  }, []);

  const handleLogout = () => {
    dispatch(unsetUser());
    navigate("/");
  };

  return (
    <>
      <h2>Home</h2>
      <p>
        welcome {user.fullName} / {user.email}
      </p>
      <button className="btn btn-primary" onClick={handleLogout}>
        Log out
      </button>
      <hr />
      {error ? <p>{error}</p> : <ProductsList products={products} />}
    </>
  );
};
