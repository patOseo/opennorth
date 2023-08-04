<header class="entry-header py-5">

    <div class="col-lg-9">

        <div class="article-date mb-3 ff-inconsolata text-secondary text-uppercase fw-bolder">
            <?php echo get_the_date('d M Y'); ?>
        </div>

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
                <?php echo $pre_authors . implode(', ', $authors); ?>
            </div>
        <?php endif; ?>

        <?php $cats = get_the_category(get_the_ID());  
        if($cats && ($cats[0]-> name != 'Uncategorized' && $cats[0]-> name != 'Non classifié(e)')): ?>
            <div class="resource-categories mb-5" uk-scrollspy="target: button; cls: uk-animation-slide-bottom-medium; delay: 200">
                <?php foreach($cats as $cat): ?>
                    <?php if($cat->name == 'Uncategorized') { continue; } ?>
                    <button class="d-inline btn pe-none text-white text-uppercase bg-primary border-0 py-1 text-center">
                        <?php echo $cat->name; ?>
                    </button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

    </div>

</header><!-- .entry-header -->