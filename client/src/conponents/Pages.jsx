import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "..";
//компонент пагинации
const Pages = observer(() => {

    const {device} = useContext(Context);
    //получаем количетсво страниц пагинации
    //делим всего товаров из ответа сервера на лимит
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <Pagination className="mt-5">
            {pages.map(page => 
                <Pagination.Item 
                    key={page}
                    active={device.page === page} 
                    onClick={() => device.setPage(page)}   
                >
                {page}
              </Pagination.Item>
            )}
        </Pagination>
    );
})

export default Pages;