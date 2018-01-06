import {ComponentFactoryResolver, Inject, Injectable} from "@angular/core";

@Injectable()
export class DynamicComponentLoader {

  rootViewContainerRef

  constructor(@Inject(ComponentFactoryResolver) private componentFactoryResolver) {

  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainerRef = viewContainerRef
  }

  loadComponent(componentClassRef) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentClassRef)
    const component = factory.create(this.rootViewContainerRef.parentInjector)
    this.rootViewContainerRef.insert(component.hostView)
  }

}
