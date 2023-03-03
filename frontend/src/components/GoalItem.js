import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../redux/goals/goalSlice";
import { FaPen } from "react-icons/fa";
import EditForm from "./EditForm";

function GoalItem({ goal }) {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    return (
        <>
            {open ? (
                <EditForm goal={goal}/>
            ) : (
                <div className="goal">
                    <div>
                        {new Date(goal.createdAt).toLocaleString("en-US")}
                        <h2>{goal.text}</h2>
                    </div>
                    <button
                        onClick={() => dispatch(deleteGoal(goal._id))}
                        className="close"
                    >
                        X
                    </button>
                    <button
                        className="close"
                        style={{ marginRight: "1rem" }}
                        onClick={() => setOpen(true)}
                    >
                        <FaPen />
                    </button>
                </div>
            )}{" "}
        </>
    );
}

export default GoalItem;
