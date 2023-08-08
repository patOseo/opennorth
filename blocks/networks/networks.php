<?php if(have_rows('networks', 'option')): ?>
<div class="container px-0 py-5">
    <div class="block-networks my-5 text-center">
        <p class="mb-6 ff-inconsolata text-primary text-uppercase fw-bold" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200">
            <?php if(lang_en()) { echo 'Our Networks'; } elseif(lang_fr()) { echo 'Nos réseaux'; } ?>
        </p>
        <div class="networks-slider uk-slider position-relative" uk-slider>
            <div class="uk-slider-container col-xl-10 mx-auto rounded-3">
                <ul class="uk-slider-items pb-4" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200; hidden: true">
                    <?php while(have_rows('networks', 'option')): the_row(); ?>
                        <?php 
                            $network_title = get_sub_field('network_title');
                        ?>
                        <li class="col col-sm-6 col-lg-4">
                            <div class="uk-panel position-relative network d-flex flex-column bg-white rounded-3 px-4 pb-4 h-100 mx-3 border-offset text-center">
                                <?php echo wp_get_attachment_image(get_sub_field('network_logo', 'option'), 'full', '', array('class' => 'mx-auto')); ?>
                                <div class="network-title <?php if(strlen(get_sub_field('network_title')) > 60) { echo 'fs-5'; } else { echo 'fs-4'; } ?> lh-sm mb-3"><?php the_sub_field('network_title'); ?></div>
                                <div class="network-subheading fs-6 lh-sm mb-4"><?php the_sub_field('network_subheading'); ?></div>
                                <div class="network-buttons mt-auto">
                                    <?php if(get_sub_field('case_study_link')): ?>
                                        <a href="<?php the_sub_field('case_study_link'); ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary mb-3"><?php if(lang_en()) { echo 'Learn more'; } elseif(lang_fr()) { echo 'En savoir plus'; } ?> 
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.5014 3.60093L13.3525 10.7498" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                                <path d="M14.5 3.60083L20.5 3.60083" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                                <path d="M20.5 9.60083L20.5 3.60083" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                                <path d="M10.3991 6.60083H5.5V18.3989H17.2981V13.4999" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                            </svg>
                                        </a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </li>
                    <?php endwhile; ?>
                </ul>
            </div>
            <a uk-scrollspy="cls: uk-animation-slide-bottom-medium" href="#" class="position-absolute top-50 start-0 translate-middle-y" uk-slider-item="previous"><img class="scale-up scale-up-lg" src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-arrow-left.svg" alt="Previous" width="24" height="55"></a>
            <a uk-scrollspy="cls: uk-animation-slide-bottom-medium" href="#" class="position-absolute top-50 end-0 translate-middle-y" uk-slider-item="next"><img class="scale-up scale-up-lg" src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-arrow-right.svg" alt="Previous" width="24" height="55"></a>
        </div>
    </div>
</div>
<?php endif;