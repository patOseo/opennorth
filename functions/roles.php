<?php 

// Role Functions
function role_any() {
	if(is_user_logged_in()) {
		return true;
	}
}