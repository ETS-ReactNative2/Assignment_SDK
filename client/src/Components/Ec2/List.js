import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instanceservice from '../../Services/Ec2Services';
import '../S3/s3.css'

const ListInstance = () => {
    const [lists, setList] = useState([]);
    const navigate = useNavigate();
    const changeState = (state, id) => {
        console.log(state, id);
        instanceservice.changeStatus(state, id).then(res => {
            navigate('/ec2/list')
        }).catch(err => {
            console.log(err);
        })
    }
    const deleteInstance = (id) => {
        console.log(id);
        instanceservice.terminateInstance(id).then(res => {
            console.log(res);
            navigate('/ec2/list')
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        instanceservice.getInstance().then(res => {
            setList(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return <>
        <div className='bucketlist'>
            {lists.length === 0 ? <p>No instance is created yet.</p> : <>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {/* <th>Name</th> */}
                            <th>Created At</th>
                            <th>InstanceId</th>
                            <th>InstanceType</th>
                            <th>state</th>
                            <th>Action</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {lists.map(list => {
                            return list.Instances.map(inst => {

                                return <tr key={inst.LaunchTime}>
                                    {/* <td>{inst.Tags.Value}</td> */}
                                    <td>{inst.LaunchTime}</td>
                                    <td>{inst.InstanceId}</td>
                                    <td>{inst.InstanceType}</td>
                                    <td>{inst.State.Name}</td>
                                    <td>
                                        <button disabled={inst.State.Name === 'terminated' ? true : false} type="button" className="btn btn-danger" onClick={() => changeState(inst.State.Name === 'stopped' ? 'START' : 'STOP', inst.InstanceId)}>{inst.State.Name === 'stopped' ? 'START' : 'STOP'}</button>
                                    </td>
                                    <td>
                                        <button disabled={inst.State.Name === 'terminated' ? true : false} type="button" className="btn btn-danger" onClick={() => deleteInstance(inst.InstanceId)}>Terminate Instance</button>
                                    </td>
                                </tr>
                            })

                        })}

                    </tbody>
                </table>
            </>}
        </div>
        <div>
            <center><Link to='/ec2/create' className="btn btn-primary">Create New Instance</Link></center>
        </div>
    </>
};
export default ListInstance;