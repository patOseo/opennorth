<div class="featured-work-container mb-5" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200;">
    <div class="d-flex justify-content-between lh-1 mb-4">
        <div class="ff-inconsolata fw-bold text-uppercase text-white">
            <?php if(lang_en()) { echo 'Featured work'; } elseif(lang_fr()) { echo 'Notre travail en vedette'; } ?>
        </div>
        <div class="ff-inconsolata arrow-link">
            <a class="text-white" href="<?php echo get_permalink(apply_filters('wpml_object_id', 72, 'post')); ?>">
                <?php if(lang_en()) { echo 'See all'; } elseif(lang_fr()) { echo 'Voir tout'; } ?>
            </a>
        </div>
    </div>
    <div class="position-relative">
        <div class="position-relative mb-5">
            <div class="border-offset border-offset-secondary border-offset-index-0 w-100 h-100">
                <div class="featured-work featured-work-image position-relative d-flex flex-column justify-content-center rounded-3 overflow-hidden z-index-1 h-100">
                <?php echo wp_get_attachment_image($learnmore['featured_image'], 'featured-work', '', array('class' => 'w-100 h-100')); ?>
                </div>
            </div>
        </div>
        <div class="featured-work-content text-white">
            <h3 class="fw-light"><?php echo get_the_title($r_id); ?></h3>
            <?php if(get_field('subtitle', $r_id)): ?>
                <div class="featured-work-subtitle mt-3 mb-4"><?php echo get_field('subtitle', $r_id); ?></div>
            <?php endif; ?>
            <a class="btn btn-secondary stretched-link" href="<?php echo get_permalink($r_id); ?>">
                <?php if(lang_en()) { echo 'Read more'; } elseif(lang_fr()) { echo 'Lire la suite'; } ?>
            </a>
        </div>
    </div>
</div>