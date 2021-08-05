import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useState } from 'react';

const AnimalNewsItem = ({ aname, imageurl, newsitemid, newsitemtype, animalid }) => {
    const [status, setStatus] = useState({});
    const context = useContext(AuthContext);
    const deleteNews = () => {
        setStatus({ isLoading: true })
        axios.delete(`/api//deleteNews/${newsitemid}`)
            .then((response) => setStatus({ isItemRemoved: true }))
            .catch(err => console.log(err));
    }
    return !status.isItemRemoved && (
        <div className={`${styles.root} gap-3 p-3 bg-white d-flex`}>
            <img alt={aname} src={imageurl} className={styles.img} />
            <div>
                <p className='m-0'>{aname} joined us!</p>
                <Link to={`/pet-profile/${animalid}`} className='m-0'>See Bio</Link>
            </div>
            {
                context.userRole === 2 &&
                <div className='ml-auto  mt-1' >
                    {status.isLoading ? <div className='loader mt-1 mb-0' style={{ fontSize: "0.25rem" }}></div> : <i style={{ color: "red" }} onClick={() => deleteNews()} className="bi bi-trash-fill"></i>}
                </div>
            }
        </div>
    )
}

export default AnimalNewsItem;
