import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <h1 className="text-2xl font-extrabold text-[#009398] tracking-wide">
                INTEX-MARKET.UZ
            </h1>

            <div className="flex items-center gap-6 text-[#A6A6A6]">
                <Link to={"https://kun.uz/"}>Просмотр веб-сайта</Link>

                <div className="flex items-center gap-2">
                    <UserOutlined className="text-xl text-blue-700" />
                    <p>Joe Melon</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
