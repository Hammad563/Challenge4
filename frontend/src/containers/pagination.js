import { Link } from "react-router-dom";

const Pagination = ({count, page, maxPage}) => {
   
    let total = Math.ceil(count / maxPage);
    let startLoop = page;
    let difference = total - page;
    if(difference <= 5){
        startLoop = total - 5;
    }
    let endLoop = startLoop + 5;
    if(startLoop <= 0){
        startLoop = 1;
    }
    const links = () => {
        const store = [];
        for(let i = startLoop; i <= endLoop; i++){
            store.push(
            <li>
                <Link to={`/dashboard/${i}`}>{i}</Link>
            </li>)
        }
        return store
    }
    return(
        total && count > 5 ?  ( 
            <div className="pagination">{links()}</div>
        ): ( '')
    )
}
export default Pagination