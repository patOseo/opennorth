<div id="valuesTab" class="values-tabs-box mb-6 p-6 rounded-5 bg-light container" uk-scrollspy="target: .block-tab; cls: uk-animation-slide-bottom-medium; delay: 200; repeat: true" >
    <h2 class="fs-5 fw-bold ff-inconsolata text-uppercase text-primary mb-4"><?php echo get_field('heading'); ?></h2>

    <?php if(have_rows('values')): ?>
        <div class="block-tabs nav nav-fill nav-tabs row gx-5 row-cols-2 row-cols-lg-5 border-0 mb-5" id="valueTabs" role="tablist">
            <?php while(have_rows('values')): the_row(); $i = get_row_index(); ?>
                <div class="block-tab nav-item col text-center <?php if($i == 1) { echo "active"; } ?>" id="valueTab<?= $i; ?>" role="presentation" data-bs-toggle="tab" data-bs-target="#valuePane<?= $i; ?>">
                    <div class="block-tab-content p-3 p-lg-3 rounded-3">
                        <div class="value-icon mb-2" uk-scrollspy="target: svg; cls: uk-animation-stroke; delay: 100; repeat: true; hidden: true"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-value-<?= $i; ?>.svg" alt="Value icon" class="" uk-svg="stroke-animation: true"></div>
                        <div class="tab-title tab-title-mobile-sm h4 mb-0 px-2 px-md-0 text-darkgrey text-center"><?php echo get_sub_field('value_title'); ?></div>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
        
        <div class="tab-content" id="tabContent" uk-scrollspy="target: .tab-pane; cls: uk-animation-slide-bottom-medium; delay: 200; repeat: true; hidden: true">
            <?php while(have_rows('values')): the_row(); $i = get_row_index(); ?>
                <div class="tab-pane fade<?php if($i == 1) { ?> show active<?php } ?>" id="valuePane<?= $i; ?>" role="tabpanel" aria-labelledby="valueTab<?= $i; ?>">
                    <?php echo get_sub_field('value_desc'); ?>
                </div>
            <?php endwhile; ?>
        </div>
    <?php endif; ?>
</div>