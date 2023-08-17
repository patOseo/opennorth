<?php 
$tabs = array('tab_1', 'tab_2');
$tabids = array();
?>

<div class="expertise-tabs">
    <p class="ff-inconsolata text-primary fw-bold text-uppercase"><?php the_field('heading'); ?></p>

    <div class="block-tabs row gx-2 gx-lg-5 border-0 mb-6" id="teamTabs" role="tablist">
        <?php foreach($tabs as $i => $tab): $group = get_field($tab); ?>
            <?php 
                $tabid = ucwords($group['heading']);
                $tabid = str_replace(' ', '', $tabid);
                $tabids[] = $tabid;
            ?>
            <div class="block-tab col-6 text-start <?php if($i == array_key_first($tabs)) { echo 'active'; } ?>" id="<?= removeAccents($tabids[$i]); ?>Tab" role="presentation" data-bs-toggle="tab" data-bs-target="#<?= $tabids[$i]; ?>"> 
                <div class="p-3 p-lg-6 pt-lg-4 block-tab-content rounded-5 bg-lightgrey active-secondary active-bgimg h-100" uk-scrollspy="target: svg; cls: uk-animation-stroke; delay: 200">
                    <div class="mb-0 mb-lg-2"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-expertise-<?php echo $i + 1; ?>.svg" alt="Expertise icon" uk-svg="stroke-animation:true"></div>
                    <div class="h2 tab-title mb-2 px-0 text-darkgrey"><?= $group['heading']; ?></div>
                    <p class="tab-title tab-title-mobile-sm mb-0 fw-normal text-darkgrey"><?= $group['subheading']; ?></p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <div class="tab-content" id="tabContent">
        <?php foreach($tabs as $i => $tab): ?>
            <?php if(have_rows($tab)): ?>
                <?php while(have_rows($tab)): the_row(); ?>
                    <div class="tab-pane fade <?php if($i == array_key_first($tabs)) { echo 'show active'; } ?>" id="<?= $tabids[$i]; ?>" role="tabpanel" aria-labelledby="<?= $tabids[$i]; ?>">
                        <div class="row mb-6">
                            <div class="col-lg-4 mb-4 mb-lg-0">
                                <div uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200; repeat: true" class="pe-lg-6 lh-lg"><?php the_sub_field('intro_text'); ?></div>
                            </div>
                            <div class="col-lg-8" uk-scrollspy="target: .expertise-element-row; cls: uk-animation-slide-bottom-medium; delay: 200; repeat: true ">
                                <p class="text-secondary ff-inconsolata text-uppercase fw-bold mb-4">
                                    <?php if(lang_en()) { echo 'Key Elements'; } elseif(lang_fr()) { echo 'Éléments clés'; } ?>
                                </p>
                                <?php if(have_rows('elements')): ?>
                                    <?php while(have_rows('elements')): the_row(); ?>
                                        <div class="row expertise-element-row mb-4">
                                            <div class="col-12">
                                                <svg class="mb-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="8" cy="8" r="7" stroke="#F94A2D" stroke-width="2"/>
                                                </svg>
                                                <h4><?php the_sub_field('heading'); ?></h4>
                                                <div class="text-darkgrey fs-6"><?php the_sub_field('content'); ?></div>
                                            </div>
                                        </div>
                                    <?php endwhile; ?>
                                <?php endif; ?>
                            </div>
                        </div>
                        <?php 
                        $learnmore = get_sub_field('learn_more'); 
                        if($learnmore): ?>
                            <div class="bg-deepblue px-4 px-lg-6 pt-6 pb-1 pb-lg-6 rounded-5" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 150;">
                                <div class="row mb-5">
                                    <div class="col-12">
                                        <h2 class="text-white"><?php echo $learnmore['heading']; ?></h2>
                                    </div>
                                </div>
                                <?php if($learnmore['featured_works']): ?>
                                    <div class="row mb-4">
                                    <?php foreach($learnmore['featured_works'] as $f_i => $featuredwork): ?>
                                        <?php if($f_i == 0): $r_id = $featuredwork; ?>
                                            <div class="col-12 mb-6">
                                                <?php
                                                    ob_start();
                                                    include('featured-work-top.php');
                                                    $output = ob_get_clean();
                                                    echo $output;
                                                ?>
                                            </div>
                                        <?php else: $r_id = $featuredwork; ?>
                                            <div class="col-lg-6 <?php if($f_i % 2 != 0) { echo 'pe-lg-6'; } else { echo 'ps-lg-6'; } ?>">
                                                <?php
                                                    ob_start();
                                                    include('featured-work.php');
                                                    $output = ob_get_clean();
                                                    echo $output;
                                                ?>
                                            </div>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endwhile; ?>
            <?php endif; ?>
        <?php endforeach; ?>
    </div>
</div>
