import React from 'react';
import styles from "./PointsTable.module.css"
const PointsTable = ({points}) => {
    return (
        <div>
            <table className={styles.point_table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>R</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Hit</th>
                        <th>Date</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                {points.map((p) =>
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.r}</td>
                        <td>{p.x}</td>
                        <td>{p.y}</td>
                        <td className={p.hit ? styles.hit_cell_yes : styles.hit_cell_no}>
                            {p.hit ? "YES" : "NO"}
                        </td>
                        <td>{p.date}</td>
                        <td>{p.user}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};


export default PointsTable;