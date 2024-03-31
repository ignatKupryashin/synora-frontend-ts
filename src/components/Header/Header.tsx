import styles from "./Header.module.scss";
import {useUserStore} from "../../store/userStore/useUserStore";
import {useProjectStore} from "../../store/projectStore/useProjectStore";
import {AppSelectOption} from "../UI/AppSelect/AppSelect";
import {IProject} from "../../models/Project/IProject";
import UserPic from "../UI/UserPic/UserPic";

const Header = () => {
	const user = useUserStore(state => state.user);
	const userName = user?.data.name || user?.data.login;
	const projects = useProjectStore(state => state.projects);




	const projectOptions: AppSelectOption<IProject>[] = [];
	projects.map((item) => projectOptions.push({
		value: item,
		label: item.name
	}))

	return (
		<div className={styles.header}>
			<UserPic user={userName ? userName : " "}/>
		</div>
	)
};

export default Header;