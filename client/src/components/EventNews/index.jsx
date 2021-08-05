import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";

const EventNews = ({ newsitemtype, newsitemid, adescription, eventdate }) => {
    const [status, setStatus] = useState({})
    const context = useContext(AuthContext);
    const deleteNews = () => {
        setStatus({isLoading: true})
        axios.delete(`/api//deleteNews/${newsitemid}`)
            .then((response) => setStatus({ isItemRemoved: true }))
            .catch(err => console.log(err));
    }
    const date = new Date(eventdate);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hour <= 12 ? hour : hour - 12}:${minutes <= 9 ? 0 : ''}${minutes} ${hour < 12 ? 'AM' : 'PM'}`
    return !status.isItemRemoved && (
        <div className={`align-items-center gap-3 p-3 bg-white justify-content-between d-flex`}>
            <i className={`material-icons`}>{newsitemtype === 'Event' ? "calendar_today" : "wysiwyg"}</i>
            <div className='flex-1 f1'>
                <b className={`m-0 text-capitalize ${newsitemtype !== "Event" ? 'font-weight-normal' : ''}`}>{adescription}</b>
                {eventdate && newsitemtype === "Event" && <p className='m-0'>{ date.toLocaleDateString('en-us', {month: 'short', day: '2-digit', year: 'numeric'})} {time}</p>}
            </div>
                {
                    context.userRole === 2 &&
                    <div >
                        {status.isLoading ? <div className='loader mt-1 mb-0' style={{ fontSize: "0.25rem" }}></div> : <i style={{ color: "red" }} onClick={() => deleteNews()} className="bi bi-trash-fill"></i>}
                    </div>
                }
        </div>
    )
}

export default EventNews;
