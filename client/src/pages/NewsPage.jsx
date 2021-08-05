import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AnimalNewsItem from "../components/AnimalNewsItem";
import styles from "../styles/NewsPage.module.css";
import NewestAddition from "../components/NewestAddition";
import EventNews from "../components/EventNews";
import AddNews from "../components/AddNews";
import { Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../components/AuthContext";

export default function NewsPage() {
    const [status, setStatus] = useState({ isLoading: true });
    const context = useContext(AuthContext);

    const getNews = () => {
        axios
            .get("/api/getNews")
            .then((res) => setStatus({ news: res.data }))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getNews();
    }, []);

    const { news, isLoading, err } = status;

    const sortedNews = news
        ? news.sort((a, b) => b.newsitemid - a.newsitemid)
        : [];
    const onAddNewNews = (newsItem) => {
        // Refetch News
        getNews();
    };

    const mostRecentAnimalIndex = sortedNews.findIndex(
        (ns) => ns.newsitemtype === "Animal Joined"
    );

    return (
        <>
            <Container>
                <Row>
                    <Col sm={12} className="text-right">
                        {context.userRole === 2 && (
                            <AddNews onAddNewNews={onAddNewNews} />
                        )}
                    </Col>
                </Row>
            </Container>
            <div className="d-flex f1 flex-column">
                {isLoading ? (
                    <div className="loader"></div>
                ) : err ? (
                    <p className="text-danger">{err.message}</p>
                ) : (
                    <div className="d-flex flex-column flex-lg-row container mt-4 mb-3 gap-3 f1">
                        {mostRecentAnimalIndex >= 0 && (
                            <NewestAddition {...sortedNews[mostRecentAnimalIndex]} />
                        )}
                        <div
                            className={`${styles.main} d-flex flex-column f1 gap-3`}
                        >
                            <div
                                className={`${styles.animalsWrapper} overflow-auto f1 d-flex flex-column gap-3`}
                            >
                                {sortedNews.map((ns, index) => index !== mostRecentAnimalIndex && (
                                    ns.newsitemtype === "Animal Joined" ? (
                                        <AnimalNewsItem
                                            {...ns}
                                            key={ns.newsitemid}
                                        />
                                    ) : (
                                        <EventNews {...ns}
                                            key={ns.newsitemid} />
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
