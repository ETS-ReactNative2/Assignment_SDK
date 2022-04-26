import { useEffect } from 'react';
import bucketservice from '../../Services/S3Services'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import './s3.css'

const ListBucket = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { buckets } = useSelector(state => state);

    const deleteBucket = (name) => {
        bucketservice.deleteBucket(name).then(res => {
            navigate('/s3/list')
        }).catch(err => {
            alert(err.message);
            console.log(err);
        })
    }
    // const listfiles = (name) => {
    //     bucketservice.getObjects(name).then(res => {
    //         navigate('/list/:name')
    //     }).catch(err => {
    //         alert(err.message);
    //         console.log(err);
    //     })
    // }

    useEffect(() => {
        bucketservice.getBuckets().then(res => {
            console.log(res.data);
            dispatch({ type: 'buckets', value: res.data })
        }).catch(err => {
            console.log('error in list' + err);
        })
    }, []);

    return (
        <div className='bucketlist'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {buckets.map(bucket => {
                        return <tr key={bucket.CreationDate}>
                            <td>{bucket.Name}</td>
                            <td>{bucket.CreationDate}</td>
                            <td>
                                <Link to={`/s3/listobj/${bucket.Name}`} className="btn btn-warning m-1">List Files</Link>
                                {/* <button type="button" className="btn btn-danger" onClick={() => listfiles(bucket.Name)}>Delete</button> */}
                                {/* <Link to={`/upload/${bucket.Name}`} className="btn btn-warning m-1">Upload Files</Link> */}
                                <button type="button" className="btn btn-danger" onClick={() => deleteBucket(bucket.Name)}>Delete**</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div>
                <center><Link to='/s3/create' className="btn btn-primary">Create New Bucket</Link>
                    <br /><br /> **(After clicking on delete please reload the page to show the changes) </center>
            </div>


        </div>
    )
}
export default ListBucket;