import { connect } from "react-redux";
import { useEffect } from "react";
import CreateAd from "../createAd/CreateAd";
import actionAdById from "../../data/DataActions/actionById";
import Preloader from "../Preloader";
import { history } from "../../App";

const ThisAdEdit = ({
	match: {
		params: { _id },
	},
	onIdChange,
	ad,
	myId,
}) => {
	useEffect(() => {
		onIdChange(_id);
	}, [_id, onIdChange]);

	useEffect(() => {
		if (ad) {
			if (ad.owner._id !== myId) {
				history.push(`/dashboard/${ad._id}`);
			}
		}
	}, [ad]);
	return ad ? <CreateAd ad={ad} /> : <Preloader />;
};

const CEdit = connect((state) => ({ ad: state.promise?.AdById?.payload, myId: state.userInfo?.payload?._id }), {
	onIdChange: actionAdById,
})(ThisAdEdit);

export default CEdit;
