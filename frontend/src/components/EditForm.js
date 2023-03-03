import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateGoal } from "../redux/goals/goalSlice";

function EditForm({ goal }) {
    const dispatch = useDispatch();
    const [text, setText] = useState(goal.text);

    const handleEdit = (e) => {
        console.log(goal._id, text);
        e.preventDefault();
        dispatch(updateGoal({ id: goal._id, text: { text } }));
    };

    return (
        <div className="modal goal" onSubmit={handleEdit}>
            <form className="modalForm">
                <div className="form-group">
                    <input
                        type="text"
                        name="text"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <button
                    className="btn "
                    type="submit"
                    style={{ margin: "0 auto" }}
                >
                    Update Goal
                </button>
            </form>
        </div>
    );
}

export default EditForm;
