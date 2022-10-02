export const Statistic = ({ text, value }) => {
    return (
        <table>
            <tr>
                <td>
                    <p>{text}</p>
                </td>
                <td>
                    <p>{value}</p>
                </td>
            </tr>
        </table>
    );
};
