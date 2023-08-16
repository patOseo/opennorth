<?php 
if(get_field('blue_background')) {
	$bg = 'bg-lightgrey';
	$textcolor = 'text-deepblue';
} elseif(is_single()) {
	$bg = 'bg-lightgrey';
	$textcolor = '';
} else {
	$bg = 'bg-white';
	$textcolor = 'text-deepblue';
}
?>
<div class="container newsletter-container px-4 px-lg-0">
	<div class="newsletter-box d-inline-block my-5 p-6 rounded-3 <?= $bg; ?>" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200; repeat: true">
	    <div class="row justify-content-between align-items-center">
	        <div class="col-lg-6 col-xl-6 mb-5 mb-lg-0">
	            <p class="h2 mb-4 <?= $textcolor; ?>"><?php the_field('newsletter_heading', 'option'); ?></p>
	            <p class="h5 mb-0 fw-light lh-base <?= $textcolor; ?>"><?php the_field('newsletter_subheading', 'option'); ?></p>
	        </div>
	        <div class="col-lg-5 col-xl-4">
	            <form class="subscription" action="https://opennorth.us2.list-manage.com/subscribe/post?u=a602fac79ef3dc584bf1a2743&amp;id=1e0c02fa29" method="post" target="_blank" novalidate="" _lpchecked="1">
			        <div class="row">
			        	<div class="col-8 px-1 mx-0">
			        		<label for="email" class="visually-hidden">Email</label>
			        		<input type="text" class="subscription__input px-3 w-100 h-100" id="email" placeholder="<?php if(lang_en()) { echo 'Email'; } elseif(lang_fr()) { echo 'Courriel'; } ?>" name="EMAIL">
			        		<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a602fac79ef3dc584bf1a2743_1e0c02fa29" tabindex="-1" value=""></div>
			        	</div>
			        	<div class="col-4 px-1 mx-0">
			        		<input type="submit" class="btn btn-md btn-primary w-100" value="<?php if(lang_en()) { echo 'Subscribe'; } elseif(lang_fr()) { echo 'S\'inscrire'; } ?>">
			        	</div>
			        </div>
			    </form>
	        </div>
	    </div>
	</div>
</div>