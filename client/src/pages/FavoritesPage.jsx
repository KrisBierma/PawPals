import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../components/AuthContext';
import { GridLayout } from "../components/Common"
import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as Enum from '../components/Common/Enum';
import * as Msgs from '../components/Common/Messages';

export default function FavoritesPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [favs, setFavs] = useState(false);
  const context = useContext(AuthContext);

  useEffect(() => {
    function getFavs() {
      axios.get(`/api/getFavs/${context.userID}`)
        .then(response => {
          setFavs(response.data);
        })
        .catch(() => enqueueSnackbar(Msgs.error500, {variant: Enum.Variant.error}));
    }

    getFavs();
  }, [context.userID, enqueueSnackbar]);

  return (
    <div style={{marginTop: '15px'}}>
      { favs.length === 0 && (<center>
        { 'No favorites yet' }
      </center>) }     
      {favs && <GridLayout cardData={favs} />}
    </div>
  )
}