<?php 

$resource = get_field('featured_resource');
$r_id = $resource[0];

if($resource): ?>
<?php if(get_field('featured_image_layout') == 1): include_once('featured-work-image.php'); else: ?>
<div class="featured-work-container" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200;">
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
    <div class="position-relative mb-6 mb-lg-0">
        <div class="border-offset border-offset-secondary border-offset-index-0 w-100 h-100">
            <div class="featured-work position-relative d-flex flex-column rounded-3 p-5 bg-white z-index-1 h-100">
                <div class="featured-work-content position-relative ps-3 border-left-gradient">
                    <div class="d-flex justify-content-between mb-3 ff-inconsolata lh-1">
                        <div class="featured-work-type text-uppercase text-secondary fw-bold">
                            <?php 
                                $rtype = get_the_terms($r_id, 'resource_type');
                            ?>
                            <?php echo implode(', ', wp_list_pluck($rtype, 'name')); ?>
                        </div>
                        <div class="featured-work-date text-darkgrey">
                            <?php echo get_the_date('j M Y', $r_id); ?>
                        </div>
                    </div>
                    <h3 class="h2 fw-light"><?php echo get_the_title($r_id); ?></h3>
                    <?php if(get_field('subtitle', $r_id)): ?>
                        <div class="featured-work-subtitle mt-3 mb-4"><?php the_field('subtitle', $r_id); ?></div>
                    <?php endif; ?>
                    <a class="btn btn-primary stretched-link" href="<?php echo get_permalink($r_id); ?>">
                        <?php if(lang_en()) { echo 'Read more'; } elseif(lang_fr()) { echo 'Lire la suite'; } ?>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<?php endif; endif; ?>