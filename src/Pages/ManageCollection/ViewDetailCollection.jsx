import React, { useEffect, useState } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import { useParams } from "react-router-dom";

const ViewDetailCollection = () => {
    const [collection, setCollection] = useState(null);

    const { id } = useParams();

    const fetchCollectionDetail = async (id) => {
        try {
            const response = await AxiosSetup.get(`/collections/${id}`);
            setCollection(response.data.data);
            console.log(collection)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCollectionDetail(id)
    }, [id])



    return (
        <div>ViewDetailCollection</div>
    );
}

export default ViewDetailCollection;