import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, updateUserState, adminUser, searchUserByUsername } from "../../../redux/actions";
import { useJwt } from "react-jwt";
import Style from "./UsersList.module.css";
import loader from "../../../img/loader.gif";
import swal from 'sweetalert';

export default function UsersList() {
  const { decodedToken } = useJwt(localStorage.getItem("usuario"));

  let autho = decodedToken?.role;

  const dispatch = useDispatch();

  const Users = useSelector((state) => state.users);
  const userSearchedFor = useSelector((state) => state.userSearchedFor)
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(false);
  const [input, setInput] = useState("")

  useEffect(() => {
    dispatch(getUsers());
    Users.length > 0 && setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Users.length]);

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const banUserFunction = async (e) => {
    let idUser = e.target.value;
    dispatch(
      updateUserState(
        {
          accountState: "banned",
        },
        idUser
      )
    );
    await swal("Baneado!", "Usuario baneado con exito", "success");
    setCount(!count);
  };

  const unbanUserFunction = async (e) => {
    let idUser = e.target.value;
    dispatch(
      updateUserState(
        {
          accountState: "active",
        },
        idUser
      )
    );
    await swal("Desbaneado!", "Usuario desbaneado con exito", "success");
    setCount(!count);
  };

  const giveAdmin = async (e) => {
    let idUser = e.target.value;
    dispatch(
      adminUser(
        {
          role: "admin",
        },
        idUser
      )
    );
    await swal("Ascendido!", "El usuario ahora tambien es admin", "success")
    setCount(!count);
  };

  const removeAdmin = async (e) => {
    let idUser = e.target.value;
    dispatch(
      adminUser(
        {
          role: "user",
        },
        idUser
      )
    );
    await swal("Descendido!", "El usuario ya no es admin", "success")
    setCount(!count);
  };

  const handleChange = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  async function handleSubmit(e) {
    // searchName(searchProduct)
    e.preventDefault();
    dispatch(searchUserByUsername(input));
    setInput("")
    /* if (input[0] === " ") {
      alert("No se permiten espacios en la primera posición")
    } */
  }


  return (
    <div className={Style.containerAll}>
      <div className={Style.generalBarsPositioning}>
        <div className={Style.searchBarPositioning}>
          <input className='input' value={input} onChange={(e) => handleChange(e)}></input>
          <button className='button' type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
        <div className={Style.refreshButtonPositioning}>
          <button className='button' onClick={() => dispatch(searchUserByUsername(""))}>Recargar Usuarios</button>
        </div>
      </div>
      {loading === false ? (
        <table className="table container">
          <thead className="table-dark">
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">E-mail</th>
              <th scope="col">Estado</th>
              <th scope="col">Rol</th>
              <th scope="col">Historial de compras</th>
              <th scope="col">Acciones posibles</th>
            </tr>
          </thead>
          <tbody>
            {userSearchedFor.length === 0 ? <>{Users?.map((e) => {
              return (
                <>
                  <tr>
                    <Link to={`/userProfile/${e._id}`}><th className="table-secondary" scope="row">{e.username}</th></Link>
                    <td className="table-info" >{e.email}</td>
                    <td className="table-light" >{e.accountState}</td>
                    <td className="table-warning" >{e.role}</td>
                    {/*   {e.paymentHistory?.map((f) => console.log(f))} */}
                    <td>{e.paymentHistory.length > 0 && (
                      <Link to={`/payments/${e._id}`}>
                        <button className="btnDash">Historial de compras</button>
                      </Link>
                    )}</td>
                    <td> {e.accountState === "banned" ? (
                      <div className="buttonConfigContainer">
                        <button className={`buttonDelete2 ${Style.buttonConfig}`}  value={e._id} onClick={(e) => unbanUserFunction(e)}>
                          Desbanear
                        </button>
                      </div>
                    ) : autho === "owner" && e.role === "admin" ? (
                      <div className={Style.buttonConfigContainer}>
                        <button
                          className={`buttonDelete ${Style.buttonConfig}`} value={e._id} onClick={(e) => banUserFunction(e)}>
                          Banear usuario
                        </button>
                        <button
                          className={`buttonDelete ${Style.buttonConfig}`} value={e._id} onClick={(e) => removeAdmin(e)}>
                          Remover admin
                        </button>
                      </div>
                    ) : (autho === "owner" || autho === "admin") && e.role === "user" ? (
                      <div className={Style.buttonConfigContainer}>
                        <button className={`buttonDelete2 ${Style.buttonConfig}`} value={e._id} onClick={(e) => giveAdmin(e)}>
                          Ascender a admin
                        </button>
                        <button className={`buttonDelete ${Style.buttonConfig2}`}
                          value={e._id} onClick={(e) => banUserFunction(e)}>
                          Banear usuario
                        </button>
                      </div>
                    ) : (
                      autho === "admin" &&
                      e.role === "user" && (
                        <div>
                          <button
                            className={`buttonDelete ${Style.buttonConfig}`}
                            value={e._id}
                            onClick={(e) => banUserFunction(e)}
                          >
                            Banear usuario
                          </button>
                        </div>
                      )
                    )} </td>
                  </tr>
                </>
              );
            })}</> :
              <>{userSearchedFor?.map((e) => {
                return (
                  <>
                    <tr>
                      <Link to={`/userProfile/${e._id}`}><th className="table-secondary" scope="row">{e.username}</th></Link>
                      <td className="table-info" >{e.email}</td>
                      <td className="table-light" >{e.accountState}</td>
                      <td className="table-warning" >{e.role}</td>
                      {/*   {e.paymentHistory?.map((f) => console.log(f))} */}
                      <td>{e.paymentHistory.length > 0 && (
                        <Link to={`/payments/${e._id}`}>
                          <button className="btnDash">Historial de compras</button>
                        </Link>
                      )}</td>
                      <td> {e.accountState === "banned" ? (
                        <div className="buttonConfigContainer">
                          <button className={`buttonDelete2 ${Style.buttonConfig}`} value={e._id} onClick={(e) => unbanUserFunction(e)}>
                            Desbanear
                          </button>
                        </div>
                      ) : autho === "owner" && e.role === "admin" ? (
                        <div className={Style.buttonConfigContainer}>
                          <button
                            className={`buttonDelete ${Style.buttonConfig}`} value={e._id} onClick={(e) => banUserFunction(e)}>
                            Banear usuario
                          </button>
                          <button
                            className={`buttonDelete2 ${Style.buttonConfig}`} value={e._id} onClick={(e) => removeAdmin(e)}>
                            Remover admin
                          </button>
                        </div>
                      ) : (autho === "owner" || autho === "admin") && e.role === "user" ? (
                        <div>
                          <button className="buttonDelete2" value={e._id} onClick={(e) => giveAdmin(e)}>
                            Ascender a admin
                          </button>
                          <button
                            className="buttonDelete" value={e._id} onClick={(e) => banUserFunction(e)}>
                            Banear usuario
                          </button>
                        </div>
                      ) : (
                        autho === "admin" &&
                        e.role === "user" && (
                          <div>
                            <button
                              className={`buttonDelete2 ${Style.buttonConfig}`}
                              value={e._id}
                              onClick={(e) => banUserFunction(e)}
                            >
                              Banear usuario
                            </button>
                          </div>
                        )
                      )} </td>
                    </tr>
                  </>
                );
              })}</>}
          </tbody>
        </table>
      ) : (
        <div className={Style.loader}>
          <img className={Style.gif} src={loader} alt="Loading" />
        </div>
      )}
    </div>
  );
}
