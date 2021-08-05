import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

const NewestAddition = ({ aname, imageurl, newsitemtype, animalid }) => {
    return (
        <div className={`${styles.root} p-lg-0 py-4 bg-white justify-content-center align-items-center f2 d-flex flex-column`}>
            <h5 className='mb-4'>Our Newest Addition</h5>
            <div className={styles.imageWrapper}>
                <img alt='' src={imageurl} />
            </div>
            <Link to={`/pet-profile/${animalid}`} className='btn btn-primary mt-4'>Get to know me</Link>
        </div>
    )
}

export default NewestAddition;