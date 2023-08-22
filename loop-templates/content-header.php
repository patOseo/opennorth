<?php
$projects = apply_filters('wpml_object_id', 98, 'resource_type', false);
?>

<header class="entry-header pt-5 pb-0 pb-lg-5">

    <div class="col-lg-9">

        <?php $rtype = get_the_terms(get_the_ID(), 'resource_type');  
        if($rtype): ?>
            <div class="resource-type mb-3 uk-animation-slide-bottom-medium">
                <?php foreach($rtype as $type): ?>
                    <?php if($type->name == 'Uncategorized') { continue; } ?>
                    <button class="d-inline btn pe-none text-white text-uppercase bg-secondary border-0 py-1 text-center">
                        <?php echo $type->name; ?>
                    </button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <?php if(!is_singular('jobs')): ?>
                <?php $proj_found = false; foreach($rtype as $type) { if($type->term_id == $projects) { $proj_found = true; break; } } ?>
                <?php if(!$proj_found): ?>
                    <div class="article-date mb-3 ff-inconsolata text-secondary text-uppercase fw-bolder">
                        <?php echo get_the_date('d M Y'); ?>
                    </div>
                <?php endif; ?>
        <?php endif; ?>

	    <?php the_title( '<h1 class="entry-title mb-4 fw-light display-5">', '</h1>' ); ?>
        <?php if(get_field('subtitle')): ?>
            <div class="subtitle mb-0 h4 fw-light"><?php the_field('subtitle'); ?></div>
        <?php endif; ?>

        <?php if(have_rows('authors')): $authors = array(); ?>
            <div class="article-author h5 lh-base w-75">
                <?php while(have_rows('authors')): the_row(); ?>
                    <?php $authors[] = ucwords(get_sub_field('author_name')); ?>
                <?php endwhile; ?>
                <?php
                    if(lang_en()) {
                        $pre_authors = 'by ';
                    } elseif(lang_fr()) {
                        $pre_authors = 'par ';
                    }
                ?>
                <?php echo $pre_authors . implode(' & ', array_filter(array_merge(array(implode(', ', array_slice($authors, 0, -1))), array_slice($authors, -1)), 'strlen')); ?>
            </div>
        <?php endif; ?>

        <?php $cats = get_the_category(get_the_ID());  
        if($cats && ($cats[0]-> name != 'Uncategorized' && $cats[0]-> name != 'Non classifié(e)')): ?>
            <div class="resource-categories mb-5" uk-scrollspy="target: button; cls: uk-animation-slide-bottom-medium; delay: 200">
                <?php foreach($cats as $cat): ?>
                    <?php if($cat->name == 'Uncategorized') { continue; } ?>
                    <button class="d-inline btn pe-none text-white text-uppercase bg-primary border-0 mb-1 mb-lg-0 py-1 text-center">
                        <?php echo $cat->name; ?>
                    </button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

    </div>

</header><!-- .entry-header -->