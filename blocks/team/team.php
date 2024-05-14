<?php 
$members = array('team', 'board');
?>

<div class="team-block container">
    <div class="block-tabs row gx-2 gx-lg-5 border-0 mb-6" id="teamTabs" role="tablist">
        <?php foreach($members as $i => $member): ?>
            <div class="block-tab col-6 text-start <?php if($i == array_key_first($members)) { echo 'active'; } ?>" id="<?= $member; ?>Tab" role="presentation" data-bs-toggle="tab" data-bs-target="#<?= $member; ?>Pane"> 
                <div class="p-3 p-lg-6 block-tab-content rounded-5 bg-lightgrey h-100">
                    <div class="h2 tab-title mb-0 px-0 text-darkgrey"><?php echo get_field($member . '_title', 'option'); ?></div>
                    <p class="tab-title tab-title-mobile-sm mb-0 fw-normal text-darkgrey"><?php echo get_field($member . '_subtitle', 'option'); ?></p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <div class="tab-content" id="tabContent" uk-scrollspy="target: .member; cls: uk-animation-fade; delay: 120">
        <?php foreach($members as $i => $member): ?>
            <div class="tab-pane fade <?php if($i == array_key_first($members)) { echo 'show active'; } ?>" id="<?= $member; ?>Pane" role="tabpanel" aria-labelledby="<?= $member; ?>Tab" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200">
                <div class="row mb-6">
                    <div class="col-lg-9">
                        <div class="py-4 fs-4"><?php echo get_field($member . '_intro', 'option'); ?></div>
                    </div>
                </div>

                <?php if(have_rows($member . '_members', 'option')): ?>
                    <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
                        <?php while(have_rows($member . '_members', 'option')): the_row(); 
                            $photo = get_sub_field('photo');
                            $name = get_sub_field('name');
                            $position = get_sub_field('position');
                            $linkedin = get_sub_field('linkedin');
                        ?>
                            <div class="col mb-5">
                                <div class="member text-center position-relative">
                                    <div class="member-photo mb-4 d-inline-block position-relative">
                                        <?php echo wp_get_attachment_image($photo, 'team', '', array('class' => 'rounded-circle member-img')); ?>
                                        <?php if($linkedin): ?>
                                        <div class="member-linkedin position-absolute bottom-0 end-0 rounded-circle me-2 p-2 lh-1 bg-white text-center">
                                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-linkedin-black.svg" width="24" height="24" alt="LinkedIn icon">
                                        </div>
                                        <?php endif; ?> 
                                    </div>
                                    <div class="member-name h4 mb-2">
                                        <?php if($linkedin): ?><a href="<?= $linkedin; ?>" target="_blank" rel="noopener noreferrer" class="stretched-link text-decoration-none text-deepblue"><?php endif; ?>
                                            <?= $name; ?>
                                        <?php if($linkedin): ?></a><?php endif; ?>
                                    </div>
                                    <div class="member-position h6 fw-normal"><?= $position; ?></div>
                                </div>
                            </div>
                        <?php endwhile; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
</div> 
