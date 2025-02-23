import '../styles/taskcard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function TaskCard({ task, onDelete, onComplete }) {

    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/task/${task.id}`);
      };

    return(
            <div className="taskcard">
                <a className='taskcard-link' onClick={handleClick}>
                <p className='inter-task-name'>{task.title}</p>
                </a>
            <p className='inter-due-at'>Due at: {task.dueDateTime}</p>
            <p className='inter-due-at'>Status: {task.status}</p>
            <div className='buttons-ctr'>
            <button onClick={() => onDelete(task.id)} className='btn'><FontAwesomeIcon icon={faTrash} style={{ color: 'red', fontSize: '20px' }} /></button>
            {task.status === 'IN_PROGRESS' && (
      <button onClick={() => onComplete(task.id)} className='btn'>
        <FontAwesomeIcon icon={faCheck} style={{ color: 'green', fontSize: '20px' }} />
      </button>
    )}
            </div>
        </div>


    );

}

export default TaskCard