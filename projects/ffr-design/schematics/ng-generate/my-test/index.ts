import { Rule, Tree } from '@angular-devkit/schematics';
import { Schema as MyTestSchema } from './schema';

// Just return the tree for now
export function myTest(options: MyTestSchema): Rule {
    return (tree: Tree) => {
        console.log(options);
        tree.create(options.path + '/hello.txt', 'Hello World!');
        return tree;
    };
}
