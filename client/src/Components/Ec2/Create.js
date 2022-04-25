import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instanceservice from '../../Services/Ec2Services'

const CreateInstance = () => {
    const [key, setKey] = useState('');
    const [imageid, setimageid] = useState('');
    const [insttype, setinsttype] = useState('');
    const [instName, setInstName] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            imgid: imageid,
            inst: insttype,
            iname: instName
        };
        console.log(data);
        instanceservice.createInstance(data).then(res => {
            navigate('/ec2/listinstance');
        }).catch(err => {
            console.log(err);
        })
    }
    return <>
        <div className='bucketlist'>
            <h3>Create a new instance</h3>
            <form onSubmit={submitHandler}>
                
                {/* <div className="form-group">
                    <label htmlFor="name">Group Name</label>
                    <input
                        type="text"
                        name="name"
                        id="gname"
                        placeholder="enter group name"
                        className="form-control"
                        value={groupName}
                        onChange={(e) =>
                            setGroupName(e.target.value)
                        }
                    />
                </div> */}
                {/* <div className="form-group">
                    <label htmlFor="name">Group Description</label>
                    <input
                        type="text"
                        name="name"
                        id="desc"
                        placeholder="write group description"
                        className="form-control"
                        value={groupDesc}
                        onChange={(e) =>
                            setGroupDesc(e.target.value)
                        }
                    />
                </div> */}
                <div className="form-group">
                    <label htmlFor="name">Instance Name</label>
                    <input
                        type="text"
                        name="name"
                        id="inst"
                        placeholder="enter instance name"
                        className="form-control"
                        value={instName}
                        onChange={(e) =>
                            setInstName(e.target.value)
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imgid">AMI Id</label>
                    <input
                        type="text"
                        name="imgid"
                        id="imgid"
                        placeholder="enter AMI id"
                        className="form-control"
                        value={imageid}
                        onChange={(e) =>
                            setimageid(e.target.value)
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inst">Instance Type</label>
                    <input
                        type="text"
                        name="inst"
                        id="inst"
                        placeholder="enter instance type"
                        className="form-control"
                        value={insttype}
                        onChange={(e) =>
                            setinsttype(e.target.value)
                        }
                    />
                </div>
                <br />
                <div className="form-group">
                    <input type="submit" value="Create Instance" className="btn btn-primary" />
                </div>
            </form>
        </div>
    </>
};
export default CreateInstance;